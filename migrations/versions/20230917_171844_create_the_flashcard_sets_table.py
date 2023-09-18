"""create the flashcard_sets table

Revision ID: b044d50bbdc9
Revises: e6184749d9d8
Create Date: 2023-09-17 17:18:44.186706

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'b044d50bbdc9'
down_revision = 'e6184749d9d8'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('flashcard_sets',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('userId', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE flashcard_sets SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('flashcard_sets')