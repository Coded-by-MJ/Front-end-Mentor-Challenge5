document.addEventListener('DOMContentLoaded', function() {
    var readBtn = document.querySelector('.readBtn');
    var chess = document.querySelectorAll('.chess-blue');
    var readIcon = document.querySelectorAll('.read-icon');
    var messages = document.querySelectorAll('.message');
    var counterSpan = document.querySelector('.counter');

    // Initial count of unread texts
    var unreadCount = document.querySelectorAll('.read-icon:not(.read)').length;
    updateCounter();

    readBtn.addEventListener('click', function() {
        readIcon.forEach(function(read) {
            read.style.display = 'none';
        });

        messages.forEach(function(message) {
            message.style.display = 'block';
        });

        chess.forEach(function(chess) {
            chess.classList.add('read');
        });

        // Disable the counter when "Mark all as read" is clicked
        unreadCount = 0;
        counterSpan.textContent = unreadCount;
    });

    // Add click event listener to each text
    var textAll = document.querySelectorAll('.text');
    textAll.forEach(function(text) {
        text.addEventListener('click', function() {
            // Find the closest parent row element
            var parentRow = text.closest('.row');

            // If the parent row is found, hide read-icon within it
            if (parentRow) {
                var iconInRow = parentRow.querySelector('.read-icon');
                if (iconInRow) {
                    iconInRow.style.display = 'none';
                }
            }

            let chessBlue = text.querySelector('.chess-blue');
            if (chessBlue) {
                chessBlue.classList.add('read');
            }

            // Check if any child element has the message class
            var messageChild = text.querySelector('.message');
            if (messageChild) {
                // Display the message
                messageChild.style.display = 'block';
            }

            // Update the counter only if the text was initially unread
            var hasUnreadIcon = text.querySelector('.read-icon:not(.read)');
            if (hasUnreadIcon) {
                unreadCount -= 1;
                updateCounter();
                // Mark the text as read to avoid multiple clicks affecting the count
                text.querySelector('.read-icon').classList.add('read');
            }
        });
    });

    // Function to update the counter span text
    function updateCounter() {
        counterSpan.textContent = unreadCount;
    }
});
