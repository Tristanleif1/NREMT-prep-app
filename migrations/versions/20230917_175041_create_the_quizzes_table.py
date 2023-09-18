"""create the quizzes table

Revision ID: cacf4dca8baf
Revises: 34b1f860ef7a
Create Date: 2023-09-17 17:50:41.413474

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'cacf4dca8baf'
down_revision = '34b1f860ef7a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('quizzes',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('userId', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE quizzes SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('quizzes')