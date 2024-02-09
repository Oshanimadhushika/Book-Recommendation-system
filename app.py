

# import pickle
# import streamlit as st
# import numpy as np


# st.header('Book Recommender System Using Machine Learning')
# model = pickle.load(open('artifacts/model.pkl','rb'))
# book_names = pickle.load(open('artifacts/books_name.pkl','rb'))
# final_rating = pickle.load(open('artifacts/final_rating.pkl','rb'))
# book_pivot = pickle.load(open('artifacts/book_pivot.pkl','rb'))

# def fetch_poster(suggestion):
#     book_name=[]
#     ids_index=[]
#     poster_url=[]

#     for book_id in suggestion:
#         book_name.append(book_pivot.index[book_id])

#     for name in book_name[0]:
#         ids=np.where(final_rating['title']==name)[0][0]
#         ids_index.append(ids)

#     for idx in ids_index:
#         url=final_rating.iloc[idx]['img_url']
#         poster_url.append(url)

#     return poster_url





# def recommend_book(book_name):
#     books_list = []
#     ratings_list = [] 
#     book_id = np.where(book_pivot.index == book_name)[0][0]
#     distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=6)

#     poster_url = fetch_poster(suggestion)

#     for i in range(len(suggestion)):
#         books = book_pivot.index[suggestion[i]]
#         for j in books:
#             books_list.append(j)
#             ratings_list.append(final_rating[final_rating['title'] == j]['num_of_rating'].values[0])  

#     return books_list, ratings_list, poster_url      



# selected_books = st.selectbox(
#     "Type or select a book from the dropdown",
#     book_names
# )

# if st.button('Show Recommendation'):
#     recommended_books, ratings, poster_url = recommend_book(selected_books)

#     col1, col2, col3 = st.columns(3)

#     with col1:
#         st.text(f"{recommended_books[1]} ")
#         st.image(poster_url[1], width=200)
#         st.text(f"Rating: {ratings[1]}")

#     with col2:
#         st.empty()
#         st.text(f"{recommended_books[2]} ")
#         st.image(poster_url[2], width=200)
#         st.text(f"Rating: {ratings[2]}")

#     with col3:
#         st.empty()
#         st.text(f"{recommended_books[3]} ")
#         st.image(poster_url[3], width=200)
#         st.text(f"Rating: {ratings[3]}")

#     col4, col5 = st.columns(2)

#     with col4:
#         st.empty()
#         st.text(f"{recommended_books[4]}")
#         st.image(poster_url[4], width=200)
#         st.text(f"Rating: {ratings[4]}")

#     with col5:
#         st.empty()
#         st.text(f"{recommended_books[5]}")
#         st.image(poster_url[5], width=200)
#         st.text(f"Rating: {ratings[5]}")














# ==============================================================================================================











# ---------------------------------------------------------------------------------------------------------------

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import streamlit as st
import numpy as np



app = Flask(__name__)
CORS(app, origins='*')

st.header('Book Recommender System Using Machine Learning')
model = pickle.load(open('artifacts/model.pkl','rb'))
book_names = pickle.load(open('artifacts/books_name.pkl','rb'))
final_rating = pickle.load(open('artifacts/final_rating.pkl','rb'))
book_pivot = pickle.load(open('artifacts/book_pivot.pkl','rb'))

def fetch_poster(suggestion):
    book_name = []
    ids_index = []
    poster_url = []

    for book_id in suggestion:
        book_name.append(book_pivot.index[book_id])

    for name in book_name[0]:
        ids = np.where(final_rating['title'] == name)[0][0]
        ids_index.append(ids)

    for idx in ids_index:
        url = final_rating.iloc[idx]['img_url']
        poster_url.append(url)

    return poster_url

def recommend_book(book_name):
    books_list = []
    ratings_list = [] 
    book_id = np.where(book_pivot.index == book_name)[0][0]
    distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=6)

    poster_url = fetch_poster(suggestion)

    for i in range(len(suggestion)):
        books = book_pivot.index[suggestion[i]]
        for j in books:
            books_list.append(j)
            ratings_list.append(final_rating[final_rating['title'] == j]['num_of_rating'].values[0])  
            
        books_list = list(books_list)
        ratings_list = list(ratings_list)

    return books_list, ratings_list, poster_url




@app.route('/get_book_names', methods=['GET'])
def get_book_names():
      book_names_list = list(book_names)
      return jsonify({'book_names': book_names_list})



@app.route('/recommend_book', methods=['POST'])
def recommend_books():
    data = request.get_json(force=True)  
    selected_book = data.get('selected_book')
    recommended_books, ratings, poster_urls = recommend_book(selected_book)

    recommended_books_list = list(recommended_books)
    ratings_list = list(ratings)
    poster_urls_list = list(poster_urls)

    response_data = {
        'recommended_books': recommended_books_list,
        'ratings': ratings_list,
        'poster_urls': poster_urls_list
    }

    return jsonify(response_data)
#     return jsonify({
#     'recommended_books': recommended_books,
#     'ratings': ratings,
#     'poster_urls': poster_urls
# })

if __name__ == '__main__':
    app.run(debug=True)
