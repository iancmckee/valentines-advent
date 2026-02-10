document.addEventListener('DOMContentLoaded', () => {
    const piecesContainer = document.getElementById('puzzle-pieces');
    const gridContainer = document.getElementById('puzzle-grid');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');

    // This is a simplified pool for the example. 
    // The original script will have the full list.
    const pool = [
        'DSC_0678-Edit.webp', 'DSC_9155.webp', 'IMG_0620.webp', 'IMG_0636.webp',
        'IMG_0651.webp', 'IMG_0744.webp', 'IMG_0838.webp', 'IMG_2276.webp'
    ];

    let PUZZLE_IMAGE = '';
    const GRID_SIZE = 4;
    let correctPieces = 0;

    function createPuzzle() {
        PUZZLE_IMAGE = `../photos/${pool[Math.floor(Math.random() * pool.length)]}`;
        piecesContainer.innerHTML = '';
        gridContainer.innerHTML = '';
        correctPieces = 0;

        // Create drop zones
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.dataset.id = i;
            gridContainer.appendChild(dropZone);
        }

        // Use a brief timeout to ensure the grid is rendered before we measure it.
        // This is a reliable way to handle layout-dependent sizing.
        setTimeout(() => {
            const pieceSize = gridContainer.querySelector('.drop-zone').offsetWidth;
            if (pieceSize === 0) {
                console.error("Could not determine puzzle piece size. Aborting.");
                return;
            }

            let pieces = [];
            for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.draggable = true;
                piece.dataset.id = i;

                const col = i % GRID_SIZE;
                const row = Math.floor(i / GRID_SIZE);

                piece.style.backgroundImage = `url(${PUZZLE_IMAGE})`;
                piece.style.backgroundSize = `${GRID_SIZE * pieceSize}px ${GRID_SIZE * pieceSize}px`;
                piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
                pieces.push(piece);
            }

            // Shuffle the pieces array to "scatter" them
            pieces.sort(() => Math.random() - 0.5);

            // Append them to the flex container. CSS will handle the layout.
            pieces.forEach(p => piecesContainer.appendChild(p));

            addDragAndDropListeners();
            addTouchListeners(); // Add the new touch listeners
        }, 50); // A 50ms delay is safer than 0 for cross-browser rendering.
    }

    function addDragAndDropListeners() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        const dropZones = document.querySelectorAll('.drop-zone');

        pieces.forEach(piece => {
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                setTimeout(() => piece.classList.add('dragging'), 0);
            });
            piece.addEventListener('dragend', () => piece.classList.remove('dragging'));
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('hovered');
            });
            zone.addEventListener('dragleave', () => zone.classList.remove('hovered'));
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('hovered');
                const pieceId = e.dataTransfer.getData('text/plain');
                const piece = document.querySelector(`.puzzle-piece[data-id='${pieceId}']`);

                if (zone.dataset.id === pieceId) {
                    // Clear the dropzone and append the piece
                    zone.innerHTML = '';
                    zone.appendChild(piece);
                    piece.draggable = false;
                    piece.classList.remove('dragging');
                    correctPieces++;
                    if (correctPieces === GRID_SIZE * GRID_SIZE) {
                        endGame();
                    }
                }
            });
        });
    }

    function addTouchListeners() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        let draggedPiece = null;
        let offsetX = 0;
        let offsetY = 0;

        pieces.forEach(piece => {
            piece.addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('puzzle-piece')) {
                    draggedPiece = e.target;
                    const touch = e.touches[0];
                    const rect = draggedPiece.getBoundingClientRect();

                    // Calculate the offset from the touch point to the top-left of the piece
                    offsetX = touch.clientX - rect.left;
                    offsetY = touch.clientY - rect.top;

                    // Temporarily move to body to avoid clipping issues
                    document.body.appendChild(draggedPiece);
                    draggedPiece.style.position = 'absolute';
                    draggedPiece.classList.add('dragging');

                    // Position it exactly where it was, but now relative to the viewport
                    draggedPiece.style.left = `${touch.clientX - offsetX}px`;
                    draggedPiece.style.top = `${touch.clientY - offsetY}px`;

                    e.preventDefault();
                }
            }, { passive: false });
        });

        document.addEventListener('touchmove', (e) => {
            if (draggedPiece) {
                const touch = e.touches[0];
                // Move the piece with the finger
                draggedPiece.style.left = `${touch.clientX - offsetX}px`;
                draggedPiece.style.top = `${touch.clientY - offsetY}px`;
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            if (draggedPiece) {
                draggedPiece.classList.remove('dragging');
                const touch = e.changedTouches[0];

                // Hide the piece to see what's underneath
                draggedPiece.style.visibility = 'hidden';
                const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
                draggedPiece.style.visibility = 'visible';

                if (dropTarget && dropTarget.classList.contains('drop-zone') && dropTarget.dataset.id === draggedPiece.dataset.id) {
                    // Correct drop
                    dropTarget.innerHTML = ''; // Clear the drop zone
                    dropTarget.appendChild(draggedPiece);
                    // Reset styles to let it sit inside the grid cell
                    draggedPiece.style.position = '';
                    draggedPiece.style.left = '';
                    draggedPiece.style.top = '';
                    correctPieces++;
                    if (correctPieces === GRID_SIZE * GRID_SIZE) {
                        endGame();
                    }
                } else {
                    // Incorrect drop, return to pieces container
                    piecesContainer.appendChild(draggedPiece);
                    // Reset styles to let it sit inside the flex container
                    draggedPiece.style.position = '';
                    draggedPiece.style.left = '';
                    draggedPiece.style.top = '';
                }
                draggedPiece = null;
            }
        });
    }

    function endGame() {
        successPhoto.src = PUZZLE_IMAGE;
        successPhoto.style.display = 'block';
        modalOverlay.classList.add('show');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    document.getElementById('replay-btn').addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
        createPuzzle();
    });

    createPuzzle();
});