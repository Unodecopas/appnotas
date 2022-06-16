export const getCategoryColor = (categoryId) => {
  switch (categoryId) {
    case 1:
      return "--pendiente-color-2";
    case 2:
      return "--personal-color-2";
    case 3:
      return "--important-color-2";
    case 4:
      return "--work-color-2";
    case 5:
      return "--pagos-color-2";
    default:
      return "--border-color";
  }
};
