from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from ..database import Base
from ..users.models import User


class Poll(Base):
    __tablename__ = 'polls'

    id = Column(Integer, primary_key=True, nullable=False, unique=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_username = Column(String, ForeignKey("users.username", ondelete="CASCADE"), nullable=False)
    
    owner = relationship("User")
    