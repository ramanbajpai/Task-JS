document.addEventListener('DOMContentLoaded', function() {
    const locationSelect = document.getElementById('location');
    const employeeTable = document.getElementById('employeeTable');
    var id = 1;
    fetch('states.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                locationSelect.appendChild(option);
            });
        });

    const employeeForm = document.getElementById('employeeForm');
    employeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('employeeName').value;
        const id = document.getElementById('employeeId').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const dob = document.getElementById('dob').value;
        const location = locationSelect.options[locationSelect.selectedIndex].text;
        addEmployeeToTable(name, id, phoneNumber, dob, location);
    });

    function addEmployeeToTable(name, id, phoneNumber, dob, location) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td>${phoneNumber}</td>
            <td>${dob}</td>
            <td>${location}</td>
        `;
        employeeTable.appendChild(newRow);
        const employeeData = {
            name: name,
            id: id,
            phoneNumber: phoneNumber,
            dob: dob,
            location: location
        };
        localStorage.setItem('employee_' + id, JSON.stringify(employeeData));
        id++;
    }
});
