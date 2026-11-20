# FPMC Research Studio

A sequential recommendation system based on Factorized Personalized Markov Chains (FPMC), featuring model implementation, configurable experiments, performance evaluation, and a web-based interface.

## Project Details

**Project Title:** Implementation and Experimental Analysis of Factorized Personalized Markov Chains (FPMC) for Next-Basket Recommendation

**Team Members:**
- Manya Arora (EN23CS301597)
- Mariya Mirza (EN23CS301599)
- Manvi Agrawal (EN23CS301596)

**Project Guide:** Prof. Sonal Modh  
**Institution:** Medi-Caps University, Indore

---

## Demo

- **Live Application:** [FPMC Research Studio](https://fpmc-studio.emergent.host/)
- **Project Overview Video:** [Watch Demo Video](https://drive.google.com/file/d/1ludX6KJ6qrDpoRTbpQKz6effi9Oitiz4/view?usp=drive_link)

---

## Features

- Sequential interaction data processing
- Factorized Personalized Markov Chains (FPMC) model
- Model training and prediction
- Configurable hyperparameters
- Next-item recommendation
- Accuracy and Mean Reciprocal Rank (MRR) evaluation
- Hyperparameter experimentation
- Performance visualization
- Web-based interface for project demonstration

---

## Technology Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| Numerical Computing | NumPy, SciPy |
| Model Optimization | Numba |
| Web Frontend | React, JavaScript, HTML, CSS |
| Web Backend | FastAPI |
| Frontend Development Server | Vite |
| Development Tools | Visual Studio Code, Git, GitHub |

---

## Model Overview

Factorized Personalized Markov Chains (FPMC) combines personalized preference modeling with sequential behavior modeling.

The model incorporates:

- **Long-term user preferences:** Represents users' general preferences toward items.
- **Sequential behavior:** Considers previous interactions to predict the next item.

The implementation uses user-item interaction sequences for training and recommendation evaluation.

**Prediction Scope:** The implemented model predicts the next item from a user's preceding interaction sequence. It does not directly generate a complete multi-item basket in one prediction.

---

## Experimental Configuration

The model supports experimentation with the following parameters:

| Parameter | Description |
|---|---|
| Embedding Dimension | Number of latent factors |
| Training Epochs | Number of training iterations |
| Learning Rate | Controls parameter update size |
| Regularization | Regularization strength |
| Negative Samples | Number of negative samples used during training |

### Evaluation Metrics

- **Accuracy:** Measures the proportion of correctly predicted target items.
- **Mean Reciprocal Rank (MRR):** Measures the ranking position of the correct target item.

---

## Repository Structure

```text
FPMC-Research-Studio/
│
├── FPMC.py
├── FPMC_numba.py
├── run.py
├── utils.py
├── IMPLEMENTATION_NOTES.md
├── README.md
│
├── data/
│   ├── idxseq
│   ├── user_idx_list.txt
│   └── item_idx_list.txt
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│
└── report/
    └── Project1_Report.pdf
```

---

## Installation and Setup

### Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/manya-76767/FPMC-Research-Studio.git
cd FPMC-Research-Studio
```

### 2. Set Up Python Environment

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Activate it on macOS/Linux:

```bash
source .venv/bin/activate
```

### 3. Install Backend Dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Start the Backend

```bash
uvicorn backend.main:app --reload
```

Backend URL:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

### 5. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, typically:

http://localhost:5173

The frontend communicates with the backend at `http://127.0.0.1:8000`.

---

## Running the FPMC Model

The original Python implementation can be executed independently of the web interface.

From the repository root:

```bash
python run.py data/
```

Example using custom hyperparameters:

```bash
python run.py data/ --n_epoch 15 --n_factor 32 --learn_rate 0.01 --regular 0.001 --n_neg 10
```

### Parameters

| Parameter | Description |
|---|---|
| `n_epoch` | Number of training epochs |
| `n_factor` | Embedding dimension |
| `learn_rate` | Learning rate |
| `regular` | Regularization parameter |
| `n_neg` | Number of negative samples |

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/health` | Checks backend status |
| `GET /api/dataset` | Retrieves dataset information |
| `POST /api/experiments` | Executes an experiment using selected parameters |

---

## Research Reference

Rendle, S., Freudenthaler, C., and Schmidt-Thieme, L. (2010). *Factorizing Personalized Markov Chains for Next-Basket Recommendation.* Proceedings of the 19th International Conference on World Wide Web (WWW 2010), pp. 811–820.

[https://doi.org/10.1145/1772690.1772773](https://doi.org/10.1145/1772690.1772773)

---

## Notes

- Experimental results may vary between runs because the original implementation randomly shuffles the data.
- Dataset usage and redistribution must comply with the dataset's licensing and permissions.
- The model implementation and web interface are organized as separate components in this repository.

---

**Developed as Project-1 at Medi-Caps University, Indore.**
