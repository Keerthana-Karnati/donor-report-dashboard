from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

#cors configure
CORS(app, resources={r"/*": {"origins": "*"}})

#db connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@db:5432/donor_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Donor(db.Model):
    __tablename__ = 'donors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    donation_amount = db.Column(db.Float, default=0.0)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "donation_amount": self.donation_amount
        }

@app.route('/api/donors', methods=['GET'])
def get_donors():
    try:
        all_donors = Donor.query.all()
        return jsonify([donor.to_dict() for donor in all_donors])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/donors', methods=['POST'])
def add_donor():
    try:
        data = request.json
        new_donor = Donor(
            name=data['name'], 
            email=data['email'], 
            donation_amount=data.get('donation_amount', 0.0)
        )
        db.session.add(new_donor)
        db.session.commit()
        return jsonify(new_donor.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route('/api/donors/<int:id>', methods=['DELETE'])
def delete_donor(id):
    try:
        donor = db.session.get(Donor, id) #modern SQLAlchemy(updtaed)
        if not donor:
            return jsonify({"error": "Donor not found"}), 404
        
        db.session.delete(donor)
        db.session.commit()
        return jsonify({"message": "Donor deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#initialising db
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating database: {e}")

if __name__ == '__main__':
    # host='0.0.0.0' (for Docker networking)
    app.run(debug=True, host='0.0.0.0', port=5000)