# FPMC Research Studio

An independently runnable academic web application built around the supplied FPMC research implementation. The original model files (`FPMC.py`, `FPMC_numba.py`, `run.py`, and `utils.py`) are retained from the uploaded `FPMC-master` archive. The React/FastAPI interface in this repository is a separate implementation inspired by the visible Emergent-hosted demonstration; it is not an export of Emergent's private generated source.

## What it does

- Inspects the included sequence dataset.
- Runs the original FPMC training script with configurable epochs, embedding dimension, learning rate, regularization, and negative samples.
- Displays Accuracy and Mean Reciprocal Rank (MRR).
- Uses the Numba implementation when Numba is installed; otherwise `run.py` falls back to the Python implementation.

**Model scope:** the supplied implementation predicts one next item from a user's preceding interaction/basket sequence. It does not predict a complete multi-item next basket.

## Requirements

- Python 3.10+ recommended
- Node.js 18+ recommended
- VS Code (optional)

## Run locally

### 1. Backend

Open a terminal in the repository root:

```bash
python -m venv .venv
```

Activate it:

Windows PowerShell:
```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:
```bash
source .venv/bin/activate
```

Install and start the API:

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

API health check: http://127.0.0.1:8000/api/health  
Interactive API docs: http://127.0.0.1:8000/docs

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

The frontend expects the backend at `http://127.0.0.1:8000`.

## Run the original model without the web interface

From the repository root, with the Python environment activated:

```bash
python run.py data/
```

Optional parameters:

```bash
python run.py data/ --n_epoch 15 --n_factor 32 --learn_rate 0.01 --regular 0.001 --n_neg 10
```

## API endpoints

- `GET /api/health` — backend status
- `GET /api/dataset` — dataset row/user/item counts
- `POST /api/experiments` — runs the original `run.py` with submitted hyperparameters

Example request body:

```json
{
  "epochs": 15,
  "embedding_dim": 32,
  "learning_rate": 0.01,
  "regularization": 0.001,
  "negative_samples": 10
}
```

## Repository structure

```text
FPMC-Research-Studio/
├── FPMC.py
├── FPMC_numba.py
├── run.py
├── utils.py
├── data/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
└── README.md
```

## Notes and limitations

- This repository currently runs experiments and returns the resulting metrics. It does not yet persist a database-backed experiment history or reproduce every page/feature of the hosted Emergent app.
- The experiment endpoint launches the original command-line training script. It can take time, especially with the Python backend.
- The original training script shuffles records randomly. Results can vary between runs; do not expect every run to reproduce a previously observed metric exactly.
- Use only datasets you are permitted to share. Review the dataset's license/permissions before making this repository public.
- The supplied dataset is included because it was part of the uploaded source archive. If it is not permitted for public redistribution, remove it and provide instructions for obtaining it separately.

## Research reference

Rendle, S., Freudenthaler, C., & Schmidt-Thieme, L. (2010). *Factorizing Personalized Markov Chains for Next-Basket Recommendation*. Proceedings of the 19th International Conference on World Wide Web (WWW '10), 811. https://doi.org/10.1145/1772690.1772773
