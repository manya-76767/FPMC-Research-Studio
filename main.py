from pathlib import Path
import subprocess, sys, re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parent.parent
app = FastAPI(title="FPMC Research Studio API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])

class ExperimentRequest(BaseModel):
    epochs: int = Field(15, ge=1, le=100)
    embedding_dim: int = Field(32, ge=2, le=256)
    learning_rate: float = Field(0.01, gt=0, le=1)
    regularization: float = Field(0.001, ge=0, le=1)
    negative_samples: int = Field(10, ge=1, le=100)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "FPMC Research Studio"}

@app.get("/api/dataset")
def dataset_info():
    path = ROOT / "data" / "idxseq.txt"
    if not path.exists():
        raise HTTPException(404, "Dataset file not found")
    lines = [x for x in path.read_text().splitlines() if x.strip()]
    users, items = set(), set()
    for line in lines:
        vals = [int(v) for v in line.split()]
        if len(vals) >= 3:
            users.add(vals[0]); items.update(vals[1:])
    return {"sequence_rows": len(lines), "unique_users_in_sequences": len(users),
            "unique_items_in_sequences": len(items), "format": "user_id item_id ... next_item"}

@app.post("/api/experiments")
def run_experiment(req: ExperimentRequest):
    cmd = [sys.executable, str(ROOT / "run.py"), str(ROOT / "data"),
           "--n_epoch", str(req.epochs), "--n_factor", str(req.embedding_dim),
           "--learn_rate", str(req.learning_rate), "--regular", str(req.regularization),
           "--n_neg", str(req.negative_samples)]
    try:
        result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=900)
    except subprocess.TimeoutExpired:
        raise HTTPException(504, "Experiment timed out")
    output = (result.stdout or "") + "\\n" + (result.stderr or "")
    if result.returncode != 0:
        raise HTTPException(500, detail=output[-4000:])
    match = re.search(r"Accuracy:([0-9.]+)\\s+MRR:([0-9.]+)", output)
    if not match:
        raise HTTPException(500, detail="Could not parse model metrics. Output: " + output[-2000:])
    return {"status": "completed", "accuracy": float(match.group(1)),
            "mrr": float(match.group(2)), "parameters": req.model_dump(),
            "backend": "Numba when installed; otherwise Python",
            "raw_output": output[-2000:]}

