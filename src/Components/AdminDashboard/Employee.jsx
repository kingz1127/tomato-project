export default function Employee() {
  const employees = [
    { id: 1, name: "John Ovie", role: "Manager" },
    { id: 2, name: "Jane Ijeh", role: "Developer" },
    { id: 3, name: "Michael Johnson", role: "Designer" },
    { id: 4, name: "Sarah Peace", role: "QA Engineer" },
    { id: 5, name: "David Adeola", role: "DevOps Engineer" },
    { id: 6, name: "Emily Adebayo", role: "Product Owner" },
  ];

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <strong>{emp.name}</strong> - {emp.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
