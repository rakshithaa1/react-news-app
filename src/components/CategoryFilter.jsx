
function CategoryFilter({
categories,
category,
setCategory
}) {

return(
<div>
  {categories.map((categoryName) => (
    <button
  key={categoryName}
  onClick={() => setCategory(categoryName)}
  style={{
    marginRight: "10px",
    marginBottom: "15px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor:
      category === categoryName ? "#2563eb" : "#e5e7eb",
    color:
      category === categoryName ? "white" : "black",
  }}
>
  {categoryName}
</button>
  ))}
</div>
)}

export default CategoryFilter;
