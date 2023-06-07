import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [isActive, setIsActive] = useState(false);
  const [openIndex, setOpenIndex] = useState("");
  const [filteredData, setFilteredData] = React.useState([ // data array
    {
      menu_id: 100, parent: 101, name: "Leave", ischecked: false, options: [
        { id: 0, checked: false, name: "Create", key: "create" },
        { id: 1, checked: false, name: "View", key: "view" },
        { id: 2, checked: false, name: "Edit", key: "edit" },
        { id: 3, checked: false, name: "Delete", key: "delete" },
        { id: 4, checked: false, name: "Export", key: "export" }
      ], sub_menu: [
        {
          menu_id: 200, "parent": 102, name: "My Leaves", ischecked: false, options: [
            { id: 0, checked: false, name: "Create2", key: "create" },
            { id: 1, checked: false, name: "View2", key: "view" },
            { id: 2, checked: false, name: "Edit2", key: "edit" },
            { id: 3, checked: false, name: "Delete2", key: "delete" },
            { id: 4, checked: false, name: "Export2", key: "export" }
          ]
        },
        {
          menu_id: 300, "parent": 103, name: "Team Member's Leave", ischecked: false, options: [
            { id: 0, checked: false, name: "Create2", key: "create" },
            { id: 1, checked: false, name: "View2", key: "view" },
            { id: 2, checked: false, name: "Edit2", key: "edit" },
            { id: 3, checked: false, name: "Delete2", key: "delete" },
            { id: 4, checked: false, name: "Export2", key: "export" }
          ]
        },
      ]
    },
    {
      menu_id: 101, parent: 111, name: "My Details", ischecked: false, options: [
        { id: 0, checked: false, name: "Create", key: "create" },
        { id: 1, checked: false, name: "View", key: "view" },
        { id: 2, checked: false, name: "Edit", key: "edit" },
        { id: 3, checked: false, name: "Delete", key: "delete" },
        { id: 4, checked: false, name: "Export", key: "export" },
      ], sub_menu: [],
    },
    {
      menu_id: 102, parent: 122, name: "Payslip", ischecked: false, options: [
        { id: 0, checked: false, name: "Create", key: "create" },
        { id: 1, checked: false, name: "View", key: "view" },
        { id: 2, checked: false, name: "Edit", key: "edit" },
        { id: 3, checked: false, name: "Delete", key: "delete" },
        { id: 4, checked: false, name: "Export", key: "export" }
      ], sub_menu: [
        {
          menu_id: 200, "parent": 102, name: "My Payslip", ischecked: false, options: [
            { id: 0, checked: false, name: "Create2", key: "create" },
            { id: 1, checked: false, name: "View2", key: "view" },
            { id: 2, checked: false, name: "Edit2", key: "edit" },
            { id: 3, checked: false, name: "Delete2", key: "delete" },
            { id: 4, checked: false, name: "Export2", key: "export" }
          ]
        },
        {
          menu_id: 300, "parent": 103, name: "Team Member's Payslip", ischecked: false, options: [
            { id: 0, checked: false, name: "Create2", key: "create" },
            { id: 1, checked: false, name: "View2", key: "view" },
            { id: 2, checked: false, name: "Edit2", key: "edit" },
            { id: 3, checked: false, name: "Delete2", key: "delete" },
            { id: 4, checked: false, name: "Export2", key: "export" }
          ]
        },
      ]
    },
  ])

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData])

  const CheckboxField = ({ checked, onChange }) => {  // all input
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={(ev) => onChange(ev.target.checked)}
        style={{ marginRight: 5 }}
      />
    );
  };

  const handleChange = (checked, table_body, index) => {

    console.log("checked", checked);
    console.log("table_body", table_body);
    console.log("index", index);

    const alldata = [...filteredData];
    var cOptions = [...alldata[index].options];
    let eOptions = [...alldata[index].sub_menu];
    filteredData[index]["ischecked"] = true;

    if (checked === true) filteredData[index]["ischecked"] = true;
    else filteredData[index]["ischecked"] = false;

    Object.keys(cOptions).forEach((checkbox) => {
      if (checked == true) {
        alldata[index].options[checkbox].checked = true;
      } else alldata[index].options[checkbox].checked = false;
    });

    Object.keys(eOptions).forEach((checkbox) => {
      if (checked == true) {
        eOptions[checkbox].ischecked = true;

        eOptions.map((i, key) => {
          Object.keys(i.options).forEach((checkbox) => {
            i.options[checkbox].checked = true;
          });
        });
      } else {
        eOptions[checkbox].ischecked = false;
        eOptions.map((i, key) => {
          Object.keys(i.options).forEach((checkbox) => {
            i.options[checkbox].checked = false;
          });
        });
      }
    });

    setFilteredData(alldata);
  };

  const handleCheckboxChange = (checked, option_item, index, table_body, option_index) => {

    const alldata = [...filteredData];
    alldata[index].options[option_index].checked = checked;
    let cOptions = [...alldata[index].options];
    const filtered = cOptions.filter((data) => {
      return data.checked === true;
    });
    if (alldata[index].options[option_index].checked == true) {
      alldata[index]["ischecked"] = true;
    } else if (filtered.length > 0) {
      alldata[index]["ischecked"] = true;
    } else alldata[index]["ischecked"] = false;

    setFilteredData(alldata);
  };

  const subMainchildhandleCheckboxChange = (checked, submenu_item, index, table_body, submenu_index) => {

    const alldata = [...filteredData];
    let cOptions = [...alldata[index].options];
    let dOptions = [...alldata[index].sub_menu[submenu_index].options];
    let submenu = [...alldata[index].sub_menu];
    alldata[index].sub_menu[submenu_index].ischecked = checked;
    const filteredSubmenu = submenu.filter((data) => {
      return data.ischecked === true;
    });
    Object.keys(cOptions).forEach((checkbox) => {
      if (checked == true) {
        alldata[index]["ischecked"] = true;
        alldata[index].options[checkbox].checked = true;
        alldata[index].options[checkbox].checked = true;
      } else {
        if (filteredSubmenu.length > 0) {
          alldata[index]["ischecked"] = true;
        } else {
          alldata[index]["ischecked"] = false;
          alldata[index].options[checkbox].checked = false;
        }

      }
    });
    Object.keys(dOptions).forEach((checkbox) => {
      if (checked == true) {
        alldata[index].sub_menu[submenu_index].options[checkbox].checked = true;
      } else {
        alldata[index].sub_menu[submenu_index].options[checkbox].checked = false;
      }
    });
    setFilteredData(alldata);

  };
  const subchildhandleCheckboxChange = (checked, submenu_option_item, index, all, submaindkey, subchildkey) => {

    const alldata = [...filteredData];
    let cOptions = [...alldata[index].options];
    let dOptions = [...alldata[index].sub_menu[submaindkey].options];
    let eOption = [...alldata[index].sub_menu];
    alldata[index].sub_menu[submaindkey].ischecked = checked;
    alldata[index].sub_menu[submaindkey].options[subchildkey].checked = checked;

    const filteredSubmenu = eOption.filter((data) => {
      return data.ischecked === true;
    });
    const filteredSubmenuChild = dOptions.filter((data) => {
      return data.checked === true;
    });
    const filteredSubmenuChild_ = dOptions.filter((data) => {
      return data.checked === false;
    });
    if (
      alldata[index].sub_menu[submaindkey].options[subchildkey].checked == true
    ) {

      alldata[index]["ischecked"] = true;
      alldata[index].sub_menu[submaindkey].ischecked = true;
      alldata[index].options[subchildkey].checked = true;
      Object.keys(cOptions).forEach((checkbox) => {

        if (alldata[index].sub_menu[submaindkey].options[subchildkey].checked != true) {
          alldata[index].options[checkbox].checked = false;
        }

      });
    } else if (filteredSubmenuChild.length > 0) {
      if (checked == false) {

        alldata[index].options[subchildkey].checked = false;
        if (filteredSubmenu.length > 0) {

          alldata[index].options[subchildkey].checked = true;

          let a = [];
          eOption.map((item1) => { a.push(...item1.options);  });

          let group = a.reduce((r, a) => {
            r[a.key] = [...(r[a.key] || []), a];
            return r;
          }, {});

          //////create_ //////
          let create_ = group.create.filter((data) => {
            return data.checked === true;
          });
          let view_ = group.view.filter((data) => {
            return data.checked === true;
          });
          let edit_ = group.edit.filter((data) => {
            return data.checked === true;
          });
          let delete_ = group.delete.filter((data) => {
            return data.checked === true;
          });
          let export_ = group.export.filter((data) => {
            return data.checked === true;
          });
          if (create_.length == 0) {
            alldata[index].options[0].checked = false;
          } else if (view_.length == 0) {
            alldata[index].options[1].checked = false;
          } else if (edit_.length == 0) {
            alldata[index].options[2].checked = false;
          } else if (delete_.length == 0) {
            alldata[index].options[3].checked = false;
          } else if (export_.length == 0) {
            alldata[index].options[4].checked = false;
          }
        } else {
          alldata[index].options[subchildkey].checked = false;
        }
      }
      alldata[index].sub_menu[submaindkey].ischecked = true;
    } else {

      alldata[index].sub_menu[submaindkey].ischecked = false;
      alldata[index].options[subchildkey].checked = false;
      if (filteredSubmenu.length > 0) {

        alldata[index]["ischecked"] = true;
        alldata[index].options[subchildkey].checked = true;

      } else {
        alldata[index]["ischecked"] = false;
      }
    }

    setFilteredData(alldata);
  };

  const ToggleButton = (openIndex, i, openIndex1) => { // if a plus button click then button set to minus, other button set to plus

    if (openIndex) {
      setIsActive(!isActive);
      setOpenIndex(openIndex);
    }
  };

  return (
    <div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Create</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Export</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? filteredData.map((table_body, index) => (
            <>
              <tr className="tr" key={index} style={{ textAlign: "left" }}>
                <td >
                  {table_body.sub_menu && table_body.sub_menu.length > 0 ?

                    <button className="plus" onClick={() => {
                      ToggleButton(table_body.menu_id, index, openIndex)
                    }} >

                      <>
                        {openIndex == table_body.menu_id ? ("-") : ("+")}
                      </>
                    </button>

                    : ""}

                  <CheckboxField
                    key={table_body.menu_id}
                    checked={table_body.ischecked}
                    onChange={(value) => handleChange(value, table_body, index)}
                  />
                  <span> {table_body.name} </span>

                </td>

                {table_body.options.map((option_item, option_index) => (
                  <td key={option_index}>

                    <CheckboxField
                      key={option_item.id}
                      checked={option_item.checked}
                      onChange={(value) => handleCheckboxChange(value, option_item, index, table_body, option_index)}
                    />

                  </td>
                ))}

              </tr>

              {openIndex == table_body.menu_id && (
                <>
                  {table_body.sub_menu && table_body.sub_menu.length > 0 ? table_body.sub_menu.map((submenu_item, submenu_index) => (
                    <tr key={submenu_index}  >
                      <td  >

                        <CheckboxField
                          key={submenu_item.id}
                          checked={submenu_item.ischecked}
                          onChange={(value) => subMainchildhandleCheckboxChange(value, submenu_item, index, table_body, submenu_index)}
                        />
                        <span>{submenu_item.name}</span>
                      </td>

                      {submenu_item.options && submenu_item.options.map((submenu_option_item, submenu_option_index) => (
                        <td key={submenu_option_index} >

                          <CheckboxField
                            key={submenu_option_item.id}
                            checked={submenu_option_item.checked}
                            onChange={(value) =>
                              subchildhandleCheckboxChange(value, submenu_option_item, index, table_body, submenu_index, submenu_option_index)
                            }
                          />

                        </td>
                      ))}

                    </tr>
                  )) : ""}
                </>
              )}

            </>
          )) : ""
          }

        </tbody>
      </Table>

    </div>
  );
};
export default App;