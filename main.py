# import pickle
# import streamlit as st
# import numpy as np
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)


# st.header('Book Recommender System Using Machine Learning')
# model = pickle.load(open('artifacts/model.pkl','rb'))
# book_names = pickle.load(open('artifacts/books_name.pkl','rb'))
# final_rating = pickle.load(open('artifacts/final_rating.pkl','rb'))
# book_pivot = pickle.load(open('artifacts/book_pivot.pkl','rb'))

# def fetch_poster(suggestion):
#     book_name = []
#     ids_index = []
#     poster_url = []

#     for book_id in suggestion:
#         book_name.append(book_pivot.index[book_id])

#     for name in book_name[0]:
#         ids = np.where(final_rating['title'] == name)[0][0]
#         ids_index.append(ids)

#     for idx in ids_index:
#         url = final_rating.iloc[idx]['img_url']
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


# @app.route('/get_book_names', methods=['GET'])
# def get_book_names():
#     return jsonify({'book_names': book_names})



# @app.route('/recommend_books', methods=['POST'])
# def recommend_books():
#     data = request.json()
#     selected_book = data.get('selected_book')
#     recommended_books, ratings, poster_urls = recommend_book(selected_book)

#     response_data = {
#         'recommended_books': recommended_books,
#         'ratings': ratings,
#         'poster_urls': poster_urls
#     }

#     return jsonify(response_data)

# if __name__ == '__main__':
#     app.run(debug=True)


