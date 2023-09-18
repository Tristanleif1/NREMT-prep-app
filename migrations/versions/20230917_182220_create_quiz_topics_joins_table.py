"""create quiz_topics joins table

Revision ID: a9874d1575a4
Revises: 3a2a5aa57ef9
Create Date: 2023-09-17 18:22:20.098596

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'a9874d1575a4'
down_revision = '3a2a5aa57ef9'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('quiz_topics',
        sa.Column('quizId', sa.Integer(), nullable=False),
        sa.Column('topicId', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['quizId'], ['quizzes.id']),
        sa.ForeignKeyConstraint(['topicId'], ['topics.id']),
        sa.PrimaryKeyConstraint('quizId', 'topicId')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE quiz_topics SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('quiz_topics')