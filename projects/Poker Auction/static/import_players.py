import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase app
cred = credentials.Certificate('../serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

players = [
    {"ID": 1, "Name": "Sagar Raj", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 2, "Name": "Mohak Kapoor", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 3, "Name": "Tanmay Banera", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 4, "Name": "Manish Lakhotia", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 5, "Name": "Abhimanyu Mittal", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 6, "Name": "Vinay B", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 7, "Name": "Aman Parakh", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 8, "Name": "Arsh Grover", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 9, "Name": "Ritwik Khanna", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 10, "Name": "Vishal Ojha", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 11, "Name": "Amit Kaushik", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 12, "Name": "Nishant Sharma", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 13, "Name": "Jasven Saigal", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 14, "Name": "Paawan Bansal", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 15, "Name": "Avneesh Munjal", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 16, "Name": "Dhaval Mudgal", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 17, "Name": "Ankit Wadhawan", "Team": "", "Price": "", "Category": "Pro", "Rating": ""},
    {"ID": 22, "Name": "Saransh Garg", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 18, "Name": "Pradip Ghosh", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 42, "Name": "Ritesh Khatwani", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 46, "Name": "Nandan Pugalia", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 37, "Name": "Suneeth Vinod Kalmady", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 31, "Name": "Ankit Jain", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 55, "Name": "Gurpal singh nanda", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 23, "Name": "Sunny Prajapati", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 51, "Name": "Shriram", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 21, "Name": "Vikas Masani", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 27, "Name": "Arush Pratap", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 28, "Name": "Sagar Chandrakant Naik", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 53, "Name": "Y Srinuvasu", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 29, "Name": "Nishant Yadav", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 34, "Name": "Rajiv Kumar", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 41, "Name": "Akash Subramanian", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 26, "Name": "Uttam Kumar", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 32, "Name": "Asif Hussain", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 45, "Name": "Neeraj Verma", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 50, "Name": "Gorav Mittal", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 39, "Name": "Madhab Mondal", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 19, "Name": "Debabrata Bansari", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 20, "Name": "Rahul Kumar Verma", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 24, "Name": "Aditya Sharma", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 25, "Name": "Animesh Banerjee", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 30, "Name": "Shivshankar", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 33, "Name": "Rupesh Kumar Sinha", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 35, "Name": "Satyajit Ghosh", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 38, "Name": "Bittu Chaudhuri", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 40, "Name": "Vivek Mahamunkar", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 43, "Name": "Biswajit Bauri", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 44, "Name": "Arshad Khan", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 47, "Name": "Anjani Kumar", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 48, "Name": "Aniket Ravishankar Ade", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 49, "Name": "Jaikishan Jangid", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 52, "Name": "Amit Kumar G Chopra", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 54, "Name": "Santosh Maroti Zade", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""},
    {"ID": 56, "Name": "Nikaah masani", "Team": "", "Price": "", "Category": "Qualifier", "Rating": ""}
]

for player in players:
    db.collection('players').document(str(player['ID'])).set(player)

print("Players imported successfully.") 