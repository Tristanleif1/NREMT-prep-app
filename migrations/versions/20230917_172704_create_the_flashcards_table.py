"""create the flashcards table

Revision ID: 34b1f860ef7a
Revises: b044d50bbdc9
Create Date: 2023-09-17 17:27:04.342354

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '34b1f860ef7a'
down_revision = 'b044d50bbdc9'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('flashcards',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('topicId', sa.Integer(), sa.ForeignKey('topics.id'), nullable=True),
    sa.Column('userId', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('flashcardSetId', sa.Integer(), sa.ForeignKey('flashcard_sets.id'), nullable=True),
    sa.Column('question', sa.String(), nullable=False),
    sa.Column('answer', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE flashcards SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('flashcards')