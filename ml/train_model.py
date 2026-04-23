import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore
from sklearn.model_selection import train_test_split # type: ignore
from sklearn.linear_model import LogisticRegression # type: ignore
import pickle
df = pd.read_csv("/Users/harshvardhan/Downloads/Documents/Racipe-project/dataset.csv")
print(df.head())
print(df.shape)

X = df['ingredients']
y = df['dish']

vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized, y, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)

print("Accuracy:", accuracy)

with open("models/model.pkl", "wb") as f:
    pickle.dump(model, f)
with open("models/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)


test_input = ["curd rice chilli"]
test_vector = vectorizer.transform(test_input)
prediction = model.predict(test_vector)
print("Prediction:", prediction[0])

