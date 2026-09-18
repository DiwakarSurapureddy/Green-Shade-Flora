from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.rag.chatbot import answer_question

router = APIRouter(prefix="/api", tags=["Plant Care AI"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)


class ChatResponse(BaseModel):
    answer: str


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    message = request.message.strip()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Message cannot be empty",
        )
    return ChatResponse(answer=answer_question(message))