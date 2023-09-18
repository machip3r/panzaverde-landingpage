/* FAQ */
/* Accordion */
function toggleAccordion(index) {
    for (let i = 1; i <= 4; i++) {
        const content = document.getElementById(`content${i}`);

        if (typeof content !== "undefined" && content !== null)
            content.style.display = (i === index) ?
                content.style.display === 'none' ? 'block' : 'none'
                : 'none';
    }
}
function stopPropagation(event) {
    event.stopPropagation();
}
