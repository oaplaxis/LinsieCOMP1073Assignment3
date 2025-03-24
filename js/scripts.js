// Define the Pizza class
class Pizza {
    constructor(size, dough, sauce, cheese = [], toppings = []) {
        this.size = size;
        this.dough = dough;
        this.sauce = sauce;
        this.cheese = cheese;
        this.toppings = toppings;
    }

    getDescription() {
        // Determine "a" or "an" based on the starting letter of the size
        const article = /^[aeiou]/i.test(this.size) ? 'an' : 'a';

        let description = `You ordered ${article} ${this.size} pizza on ${this.dough} dough, with ${this.sauce} sauce`;

        // Cheese handling
        let cheeseList = this.cheese.map(cheese => `${cheese} cheese`);

        // Toppings handling
        let toppingList = this.toppings.map(({ topping, position }) => {
            position = position ?? 'whole'; 
            return position === 'whole' ? topping : `${topping} on the ${position} half`;
        });
        
        // Combine cheese and toppings into a single list
        const combinedList = [...cheeseList, ...toppingList];

        // Join combined list properly with commas and "and"
        if (combinedList.length > 0) {
            if (combinedList.length === 1) {
                description += `, ${combinedList[0]}`;
            } else if (combinedList.length === 2) {
                description += `, ${combinedList.join(' and ')}`;
            } else {
                description += `, ${combinedList.slice(0, -1).join(', ')}, and ${combinedList[combinedList.length - 1]}`;
            }
        }

        description += '!';

        return description;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const studentInfo = document.getElementById('student-info');
    const studentName = 'Linsie';
    const studentId = '200495638'; 
  
    studentInfo.textContent = `${studentName} | ${studentId}`;
  });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.ingredients').addEventListener('submit', (event) => {
        event.preventDefault();

        // Capture size, dough, and sauce (required)
        const size = document.querySelector('input[name="size"]:checked')?.value;
        const dough = document.querySelector('input[name="dough"]:checked')?.value;
        const sauce = document.querySelector('input[name="sauce"]:checked')?.value;

        // Validate required fields
        if (!size || !dough || !sauce) {
            alert('Please select a size, dough, and sauce.');
            return;
        }

        // Capture cheese
        const cheese = Array.from(document.querySelectorAll('input[type="checkbox"][name^="cheese"]:checked'))
            .map(checkbox => checkbox.value);

        // Capture toppings (optional)
        const toppings = Array.from(document.querySelectorAll('input[type="checkbox"][name^="top"]:checked'))
            .map(checkbox => {
                const position = document.querySelector(`input[name="${checkbox.id}-position"]:checked`)?.value;
                return { topping: checkbox.value, position };
            });

        // Create a new Pizza object with correct data
        const pizza = new Pizza(size, dough, sauce, cheese, toppings);

        // Output the description to the page
        const output = document.getElementById('pizza-output');
        output.innerHTML = pizza.getDescription();
    });
});

// Handle radio button clearing logic
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', (event) => {
        if (event.target.checked) {
            if (event.target.dataset.waschecked === 'true') {
                event.target.checked = false;
                event.target.dataset.waschecked = 'false';
            } else {
                event.target.dataset.waschecked = 'true';
            }
        }

        // Reset other radios in the group
        document.querySelectorAll(`input[name="${event.target.name}"]`).forEach(r => {
            if (r !== event.target) r.dataset.waschecked = 'false';
        });
    });
});
