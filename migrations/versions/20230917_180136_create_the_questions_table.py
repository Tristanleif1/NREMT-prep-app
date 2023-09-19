"""create the questions table

Revision ID: 3a2a5aa57ef9
Revises: cacf4dca8baf
Create Date: 2023-09-17 18:01:36.869594

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '3a2a5aa57ef9'
down_revision = 'cacf4dca8baf'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('questions',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('quizId', sa.Integer(), sa.ForeignKey('quizzes.id'), nullable=False),
    sa.Column('question', sa.String(), nullable=False),
    sa.Column('option1', sa.String(), nullable=False),
    sa.Column('option2', sa.String(), nullable=False),
    sa.Column('option3', sa.String(), nullable=False),
    sa.Column('option4', sa.String(), nullable=False),
    sa.Column('correct_answer', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE questions SET SCHEMA {SCHEMA};")
    


def downgrade():
    op.drop_table('questions')