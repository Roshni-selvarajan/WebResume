from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class CertificationInput(BaseModel):
    title: str

@app.post("/generate-certification-point")
def generate_certification_point(certification: CertificationInput):
    """
    Generate a concise certification achievement point.
    """
    if not certification.title:
        raise HTTPException(status_code=400, detail="Title is required.")
    
    # Generate a concise certification achievement point
    achievement_point = (
        f"Earned {certification.title} certification, demonstrating advanced skills in AI and ML techniques."
    )
    
    return {
        "title": certification.title,
        "achievement_point": achievement_point
    }
