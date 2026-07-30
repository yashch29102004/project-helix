"""change embedding dimension

Revision ID: b6674bb14da2
Revises: b4ea0916c46f
Create Date: 2026-07-30 12:17:53.520800

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b6674bb14da2'
down_revision: Union[str, Sequence[str], None] = 'b4ea0916c46f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("""
        ALTER TABLE code_embeddings
        ALTER COLUMN embedding
        TYPE vector(384);
    """)

def downgrade():
    op.execute("""
        ALTER TABLE code_embeddings
        ALTER COLUMN embedding
        TYPE vector(768);
    """)
