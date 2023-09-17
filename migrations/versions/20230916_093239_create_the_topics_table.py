"""create the topics table

Revision ID: e6184749d9d8
Revises: ffdc0a98111c
Create Date: 2023-09-16 09:32:39.254571

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'e6184749d9d8'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('topics',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True)
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


def downgrade():
    pass