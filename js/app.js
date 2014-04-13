App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('book', {path: '/books/:book_id'});
  this.resource('genre', {path: '/genres/:genre_id'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
        books: this.store.findAll('book'),
        genres: this.store.findAll('genre')
    });
  },
  setupController: function(controller, model) {
    controller.set('books', model.books);
    controller.set('genres', model.genres);
  }
});

App.IndexController = Ember.Controller.extend({});

App.BookRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('book', params.book_id);
    }
});

App.BooksController = Ember.ArrayController.extend({
    sortProperties: ['title']
});

App.GenresController = Ember.ArrayController.extend({
    sortProperties: ['name']
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({

});

App.BookDetailsComponent = Ember.Component.extend({
    classNameBindings: ['ratingClass'],
    ratingClass: function() {
        return 'rating-' + this.get('book.rating');
    }.property('book.rating')
});

App.Book = DS.Model.extend({
    title: DS.attr(),
    author: DS.attr(),
    review: DS.attr(),
    rating: DS.attr('number'),
    amazon_id: DS.attr(),
    genre: DS.belongsTo('genre'),
    url: function() {
        return 'http://www.amazon.com/gp/product/'+this.get('amazon_id');
    }.property('amazon_id'),
    image: function() {
        return 'http://images.amazon.com/images/P/'+this.get('amazon_id')+'.01.ZTZZZZ.jpg';
    }.property('amazon_id')
});

App.Book.FIXTURES = [
    {
        id: 1,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        review: 'While the price of this book is steep, this is easily the best version of this book in print. The gilded pages and high-quality leather look, smell and feel wonderful. This is not the questionable quality leather used on previous versions, this is the real deal. More importantly, this version has, as J.R.R. recorded in letters, reproductions of the Book of Marzubul. These are the pages from the Dwarven book found in the Mines of Moria by Gandalf and the Fellowship. In the begining and ending of the book are also included maps that fold out to render Middle-earth for the reader, again as the author originally wanted.',
        rating: 5,
        amazon_id: '0544003411',
        genre: 3
    },
    {
        id: 2,
        title: 'Fight Club',
        author: 'Chuck Palahniuk',
        review: 'Usually great books are either turned into mediocre films or else great films are made from mediocre books (and we wont even get into the sordid details of the novelizations). Fight Club is one of the rare instances where a great film was made from a great book. It is perhaps unfair to mention the film version while discussing the book as they are actually two very different animals. (And animal is the right word -- perhaps uniquely amongst contemporary novelists, Chuck Palahniuk writes novels that seem to live in the readers hands, often threatening at any minute to lunge for the throat.) While most of the films incidents are in the book and much of the razor-sharp dialouge is reproduced directly from the page, the book actually has a far greater satiric edge than the film. Whereas the film used the story as a celebration of nihilism, the book is far too self-aware to allow itself to truly celebrate anything. As such, it becomes less a call to action and more a devastatingly real portrait of a society that has become so commercialized and codified that even the once primal act of revolution becomes just another submission to pop culture',
        rating: 3,
        amazon_id: '0393327345',
        genre: 1
    },
    {
        id: 3,
        title: 'The Road',
        author: 'Cormac McCarthy',
        review: '"The Road" is a work of stunning, savage, heartbreaking beauty. Set in the post-apocalyptic hell of an unending nuclear winter, Cormac McCarthy writes about a nameless man and his young son, wandering through a world gone crazy; bleak, cold, dark, where the snow falls down gray; moving south toward the coast, looking somewhere, anywhere, for life and warmth. Nothing grows in this blasted world; people turn into cannibals to survive. We dont know if were looking at the aftermath of a nuclear war, or maybe an extinction level event -- an asteroid or a comet; McCarthy deliberately doesnt tell us, and we come to realize it doesnt matter anyway. Whether man or nature threw a wild pitch, the world is just as dead.',
        rating: 1,
        amazon_id: '0307387895',
        genre: 1
    }
];

App.Genre = DS.Model.extend({
    name: DS.attr(),
    books: DS.hasMany('book', {async: true})
});

App.Genre.FIXTURES = [
    {
        id: 1,
        name: 'Fiction',
        books: [2,3]
    },
    {
        id: 2,
        name: 'History'
    },
    {
        id: 3,
        name: 'Fantasy',
        books: [1]
    }
];