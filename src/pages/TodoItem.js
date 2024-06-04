export default function (key) {
    return `
        <div data-key=${key}>
            <input type="checkbox" />
            <p class="title">Title</p>
            <button class="detail">Detail</button>
            <p class="date-created">Date Created</p>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>    
    `;
}