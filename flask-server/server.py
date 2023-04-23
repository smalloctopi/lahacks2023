from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS, cross_origin
from flask_session import Session
from models.models import db, User
from utils import generate_prompt, tokenize, text_summarizer, stem, bag_of_words
from config import ApplicationConfig
import openai
import whisper
import jwt
import os
from pdfminer.high_level import extract_text
import cohere
co = cohere.Client('PKwpHpAfrm6yzOJc9StFMkWrYj1NUvfTrVtLxznG')

openai.api_key = os.getenv("OPENAI_API_KEY")
SECRET = os.getenv("SECRET")

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config.from_object(ApplicationConfig)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.post('/')
def index():
    token = request.get_json()['jwt']
    if token is None:
        return jsonify({"error": "Unauthorized token"}), 401
    
    decoded_data = jwt.decode(token, key=SECRET, algorithms=["HS256"])

    if decoded_data['id'] is None:
        return jsonify({"error": "Unauthorized data"}), 401
    
    user = User.query.filter_by(id = decoded_data['id']).first()
    
    if user is None:
        return jsonify({"error": "Unauthorized user"}), 401
    
    return jsonify({"message": "success"})



@app.post('/generate_exams')
def generate_exams():
    completion = openai.Completion.create(
    model="text-davinci-003", 
    prompt=generate_prompt(request.json['message']),
    max_tokens=2049,
    temperature=0,
    )
    return completion.choices[0].text



# engine = create_engine("sqlite:///hackathon.db", echo=True)

# @app.post('/register')
# def register():
#     email = request.json["email"]
#     password = request.json["password"]
#     firstName = request.json["firstName"]
#     lastName = request.json["lastName"]


#     user_exists = User.query.filter_by(email=email).first() is not None

#     if user_exists:
#         return jsonify({"error": "User already exists"}), 409
    
#     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
#     new_user = User(email=email, firstName=firstName, lastName=lastName, password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()
    
#     payLoad = {"id": new_user.id}
#     token = jwt.encode(payLoad, SECRET, algorithm="HS256")
#     return token



@app.post('/login')
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    # session["user_id"] = user.id
    # payLoad = {"email": email, "password": password}
    payLoad = {"id": user.id}


    token = jwt.encode(payLoad, SECRET, algorithm="HS256") 
    return token



import re
# request.form is another method to access request body
@cross_origin()
@app.post('/data')
def send_data():
    # transcribe data
    uploaded_file = request.files['file']
    extension = uploaded_file.filename.split('.')[-1]
    print(extension) # DELETE!
    if uploaded_file.filename != '':
    #     uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], uploaded_file.filename))
        uploaded_file.save(uploaded_file.filename)
    if extension == 'pdf':
        text = extract_text(uploaded_file.filename)
    elif extension == 'mp3' or extension == 'wav' or extension == 'mp4':
        model = whisper.load_model("base")
        result = model.transcribe(uploaded_file.filename, fp16=False)
        text = result['text']
    files = os.listdir(app.config['UPLOAD_PATH'])# this is where we will send the text to the model
    #test = text_summarizer(text) #commenting it out to use cohere 
    response = co.summarize(
        text=text,
        )
    # print(response.summary)

















    # UNCOMMENT FOR BETTER PERFORMANCE!
    completion = openai.Completion.create(
    model="text-davinci-003", 
    prompt=generate_prompt(response.summary),
    max_tokens=2049,
    temperature=0,
    )
    print(response)
    textUtil = response

 #recall question example 
numQs = 5
qType = "recall"
response = co.generate(
 model='command-xlarge-nightly',
 prompt='generate a list of' + str(numQs)+' ' + qType +' questions and answers from this paragraph: ' +  "textUtil" + 'Denote each question with % and a number. Denote each answer with *A and the number, followed by the answer to the question.',
 max_tokens=300,
 temperature=0.9,
 k=0,
 stop_sequences=[],
 return_likelihoods='NONE')
#print('Prediction: {}'.format(response.generations[0].text))
generatedQ = response.generations[0].text
print(generatedQ)


#normal type question
response = co.generate(
 model='command-xlarge-nightly',
 prompt='generate a list of' + str(numQs)+' ' + qType +' questions and answers from this paragraph: ' + "textUtil" + 'Denote each question with % and a number. Denote each answer with *A and the number, followed by the answer to the question.',
 max_tokens=300,
 temperature=0.9,
 k=0,
 stop_sequences=[],
 return_likelihoods='NONE')
#print('Prediction: {}'.format(response.generations[0].text))
generatedQ = response.generations[0].text
print(generatedQ)

#question extraction

def questionAnsList (generatedQ, num):
 generatedQClean = generatedQ.replace("\n", " ")
 questions = generatedQClean.split("%")
 return(questions[num])

questionAnsList(generatedQ, 2)

def extractQorA(num, qOrA):
 questOrAns = questionAnsList(generatedQ, num).split("*")
 return questOrAns[qOrA]
quest = 0
ans = 1
print(extractQorA(2, ans))

#question extraction
 

    #return "received" #using print cause thats what the cohere api uses in its docs

#########################################










######################################
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=5000, debug=True)





