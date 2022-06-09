export const getCategoryColor = (categoryId) => {
    switch (categoryId) {
        case 1:
            return "--todo-color-2";
        case 2:
            return "--react-color-2";
        case 3:
            return "--personal-color-2";
        case 4:
            return "--work-color-2";
        default:
            return "--border-color";
    }
};
