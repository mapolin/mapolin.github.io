(function( window, document ) {
    "use strict";

    // Game board scheme
    /*
        [1][2][3]
        [4][5][6]
        [7][8][9]
    */

    // Define global variables
    var TotalSquares = 9;
    var WinConditions = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9]
    ];
    var corners = [1, 3, 7, 9];
    var symbols = {
        user: 'X',
        pc: 'O'
    };

    // Define element creation functions
    function Div( attributes, content ) {
        // create element
        var div = document.createElement('div');

        // add attributes
        if( attributes !== undefined ) {
            for( var att in attributes ) {
                div.setAttribute( att, attributes[att] );
            }
        }

        // add content
        if( content !== undefined && typeof content === 'string' ) {
            div.innerHTML = content;
        }

        return div;
    };

    // Define main classes
    function Helper() {};
    function TicTacToe( container ) {
        if( container === undefined || container === null ) {
            container = 'body';
        }

        this.container = document.querySelector( container );

        this.createBoard();
        this.initGame();
    };

    // Define Helper Class
    Helper.prototype = {
        // check if the specified user wins the game
        // called after each move
        checkWin: function( squares ) {
            if( squares.length >= 3 ) {
                for( var i = 0; i < WinConditions.length; i++ ) {
                    // check if checked squares meet a winning condition
                    var matches = 0;

                    for( var s = 0; s < squares.length; s++ ) {
                        if( WinConditions[i].indexOf( squares[s] ) !== -1 ) {
                            matches++;
                        }
                    }

                    if(matches >= 3) {
                        return true;
                    }
                }

                return false;
            }
            else {
                return false;
            }
        },

        // check if all squares are checked
        checkOver: function( squares ) {
            if( squares && typeof squares.push === 'function' ) {
                for( var s in squares ) {
                    if( !squares[s].elem.getAttribute( 'checked' ) ) {
                        return false;
                    }
                }

                return true;
            }

            return undefined;
        },

        // check if a square is taken
        isTaken: function( square ) {
            if( square.elem !== undefined ) {
                return square.elem.getAttribute( 'checked' );
            }
            else {
                return square.getAttribute( 'checked' );
            }
        },

        // check if a line is worth taking squares from
        checkLine: function( line, squares, user ) {
            for( var i = 0; i < line.length; i++ ) {
                var elem = squares[line[i] - 1].elem;

                if( this.isTaken(elem) && elem.getAttribute( 'checked-by' ) !== user ) {
                    return false;
                }
            }

            return true;
        }
    };

    // Define TicTacToe Class
    TicTacToe.prototype = {
        squares: [],
        over: 0, // 0 - default, user, pc, draw
        winners: ['', 'user', 'pc', 'draw'],
        users: {
            user: [], // fill with index of checked squares
            pc: [] // fill with index of checked squares
        },
        currentUser: 'user',

        // reset methods
        resetGame: function() {
            this.squares = [];
            this.over = 0;
            this.users.user = [];
            this.users.pc = [];
            this.currentUser = 'user';

            this.resetBoard();
        },

        resetBoard: function() {
            this.container.innerHTML = '';
            this.createBoard();
        },

        // switch user on click
        switchUser: function() {
            if( this.currentUser === 'user' ) {
                this.currentUser = 'pc';
            }
            else {
                this.currentUser = 'user';
            }
        },

        // create methods
        createBoard: function() {
            var row = 1, current, _this = this;
            for( var i = 1; i <= TotalSquares; i++ ) {

                row = (i < 4) ? 1 : (i < 7) ? 2 : 3; 
                current = new Div({ 'data-index': i, 'class': ('square row-' + row) });

                this.squares.push({
                    elem: current,
                    index: i
                });

                this.container.appendChild( this.squares[i-1].elem );

                current.addEventListener( 'click', function( event ) {
                    event.preventDefault();

                    _this.click( this );

                }, false);
            }

            this.createOverlay();
            this.bindReset( this.resetKey );
        },

        createOverlay: function() {
            this.overlay = new Div({
                'class': 'game-overlay',
                'style': 'display: none;'
            });

            this.resultBox = new Div({
                'class': 'result'
            });

            this.resetKey = new Div({
                'class': 'reset'
            }, 'Reset');

            this.container.appendChild( this.overlay );
            this.overlay.appendChild( this.resultBox );
            this.overlay.appendChild( this.resetKey );
        },

        // AI methods
        findBest: function() {
            this.currentUser = 'pc';
            // if it's the computer's first move, take the middle square
            if( this.users.pc.length == 0 ) {
                if( !this.helper.isTaken( this.squares[4] ) ) {
                    this.click( this.squares[4].elem, true );
                    return;
                }
                else {
                    for( var b = 0; b < corners.length; b++ ) {
                        if( !this.helper.isTaken( this.squares[corners[b]] ) ) {
                            this.click( this.squares[corners[b]].elem, true );
                            return;
                        }
                    }
                }
            }
            else {
                // find the best possible line to fill
                var lines = [];
                var can_win = false;

                for( var l = 0; l < WinConditions.length; l++ ) {
                    var matches = 0;

                    for( var i = 0; i < this.users.pc.length; i++ ) {
                        if( WinConditions[l].indexOf( this.users.pc[i] ) !== -1 ) {
                            matches++;
                            can_win = (matches == 2) && this.helper.checkLine( WinConditions[l], this.squares, 'pc' );

                            lines.push({
                                line: WinConditions[l],
                                matches: matches,
                                win: can_win
                            });

                            if( can_win ) {
                                this.takeEmptySquare( WinConditions[l] );

                                return;
                            }
                        }
                    }
                }

                lines = lines.sort( function( a, b ) {
                    return b.matches - a.matches;
                });

                // if we can't win, make sure the user doesn't win as well
                if( !can_win ) {
                    var choices = [];
                    var user_win = false;

                    // check if user has taken 2 corners and fuck him up with a middle square
                    if( this.users.user.length == 2 ) {
                        if( corners.indexOf( this.users.user[0] ) > -1 && corners.indexOf( this.users.user[1] ) > -1 ) {
                            this.click( this.squares[1].elem, true );

                            return;
                        }
                    }

                    for( var u = 0; u < WinConditions.length; u++ ) {
                        var matches = 0;

                        for( var j = 0; j < this.users.user.length; j++ ) {
                            if( WinConditions[u].indexOf( this.users.user[j] ) !== -1 ) {
                                matches++;
                                user_win = (matches == 2);

                                if( user_win && this.helper.checkLine( WinConditions[u], this.squares, 'user' ) ) {
                                    this.takeEmptySquare( WinConditions[u] );

                                    return;
                                }
                            }
                        }
                    }

                    for( var c = 0; c < lines.length; c++ ) {
                        var c_line = lines[c].line;

                        if( this.helper.checkLine( c_line, this.squares, 'pc' ) ) {
                            this.takeEmptySquare( c_line );

                            return;
                        }
                    }
                }
                else {
                    // win the game
                    this.takeEmptySquare( can_win );
                }

                return lines;
            }
        },

        takeEmptySquare: function( line ) {
            // squares 1, 3, 7, 9 are checked with priority
            for( var c = 0; c < corners.length; c++ ) {
                var match = line.indexOf( corners[c] );

                if( match > -1 ) {
                    if( !this.helper.isTaken( this.squares[line[match] - 1] ) ) {
                        this.click( this.squares[line[match] - 1].elem, true );
                        return;
                    }
                }
            }

            for( var i = 0; i < line.length; i++ ) {
                var index = line[i] - 1;

                if( !this.helper.isTaken( this.squares[index] ) ) {
                    this.click( this.squares[index].elem, true );
                    return;
                }
            }
        },

        // handling methods
        click: function( elem, isPC ) {
            if( elem.getAttribute( 'checked' ) ) {
                console.log( 'Square is already checked.' );
                return;
            }

            elem.setAttribute( 'checked', true );
            elem.setAttribute( 'checked-by', this.currentUser );
            elem.classList.add( 'checked-' + this.currentUser );
            elem.innerHTML = symbols[this.currentUser];

            this.users[this.currentUser].push( parseInt( elem.getAttribute( 'data-index' ) ) );

            var isWin = this.helper.checkWin( this.users[this.currentUser] );

            if( isWin ) {
                this.resultBox.innerHTML = 'Winner is: ' + this.currentUser;
                this.over = this.currentUser;
            }
            else {
                if ( this.helper.checkOver( this.squares ) ) {
                    this.resultBox.innerHTML = 'Game over. It\'s a draw.';
                    this.over = 'draw';
                }
            }

            if( this.over !== 0 ) {
                this.showOverlay();
            }
            else {
                this.switchUser();

                if( !isPC ) {
                    this.findBest();
                }
            }
        },

        showOverlay: function() {
            this.overlay.style.display = 'block';
        },

        hideOverlay: function() {
            this.overlay.style.display = 'none';
        },

        bindReset: function( element ) {
            var _this = this;

            if( typeof element === 'string' ) {
                this.resetKey = document.querySelector( element );
            }
            else {
                this.resetKey = element;
            }

            this.resetKey.addEventListener( 'click', function(event) {
                event.preventDefault();
                _this.resetGame();
            }, false );
        },

        initGame: function() {
            this.resetGame();

            this.helper = new Helper();
        }
    };

    window.TicTacToe = TicTacToe;
    window.Helper = Helper;

})( window, document );