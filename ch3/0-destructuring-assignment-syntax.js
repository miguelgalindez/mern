
/**
 * DESTRUCTURING ASSIGNMENT SYNTAX.
 * The following two sentences are equals
 */
const { items } = args
const items = args.items


/**
 * Simply put, it is a simplified way of accessing specific field of a given variable for further use in that scope. 
 * In your original example, it is declaring a variable items for use in the function body that is the items field of that first argument.
 * The following two sentences are equals
 */
const SortableList = SortableContainer(({items}) => {
    // do stuff with items here
})

const SortableList = SortableContainer((input) => {
    const items = input.items
    // do stuff with items here
})