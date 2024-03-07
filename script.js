document.addEventListener('DOMContentLoaded', function() {
    var readBtn = document.querySelector('.readBtn');
    var chess = document.querySelectorAll('.chess-blue');
    var readIcon = document.querySelectorAll('.read-icon');
    var messages = document.querySelectorAll('.message');
    var counterSpan = document.querySelector('.counter');

    // Initial count of unread texts
    var unreadCount = document.querySelectorAll('.read-icon:not(.read)').length;
    updateCounter();

    var counterDisabled = false; // Flag to indicate if counter should be disabled

    readBtn.addEventListener('click', function() {
        // Disable the counter when "Mark all as read" is clicked
        counterDisabled = true;
        counterSpan.textContent = '0';
        
        readIcon.forEach(function(read) {
            read.style.display = 'none';
        });

        messages.forEach(function(message) {
            message.style.display = 'block';
        });

        chess.forEach(function(chess) {
            chess.classList.add('read');
        });
    });

    // Add click event listener to each text
    var textAll = document.querySelectorAll('.text');
    textAll.forEach(function(text) {
        text.addEventListener('click', textClickHandler);
    });

    // Function to handle click events on individual text messages
    function textClickHandler() {
        if (!counterDisabled) { // Check if the counter is disabled
            var parentRow = this.closest('.row');

            if (parentRow) {
                var iconInRow = parentRow.querySelector('.read-icon');
                if (iconInRow) {
                    iconInRow.style.display = 'none';
                }
            }

            let chessBlue = this.querySelector('.chess-blue');
            if (chessBlue) {
                chessBlue.classList.add('read');
            }

            var messageChild = this.querySelector('.message');
            if (messageChild) {
                messageChild.style.display = 'block';
            }

            var hasUnreadIcon = this.querySelector('.read-icon:not(.read)');
            if (hasUnreadIcon) {
                unreadCount -= 1;
                updateCounter();
                this.querySelector('.read-icon').classList.add('read');
            }
        }
    }

    // Function to update the counter span text
    function updateCounter() {
        counterSpan.textContent = unreadCount;
    }
});
