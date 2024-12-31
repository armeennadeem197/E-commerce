const categorySchema = {
    name: 'category',
    type: 'document',
    title: 'Category',  // Corrected 'tittle' to 'title' and 'Catergory' to 'Category'
    fields: [
        {
            name: 'name',
            title: 'Name of Category',  // Corrected 'Catergory' to 'Category'
            type: 'string',
        }
    ]
};

export default categorySchema;
