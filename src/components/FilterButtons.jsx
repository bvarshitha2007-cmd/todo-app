
const filters = ["all", "active", "completed"];

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filters">
      {filters.map((item) => (
        <button
          key={item}
          className={filter === item ? "selected" : ""}
          onClick={() => setFilter(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
