import Select, { createFilter } from "react-select";
import { useState, useEffect, useMemo } from "react";
import escapeRegExp from "lodash/escapeRegExp";

const MAX_DISPLAYED_OPTIONS = 500;

export default function ModuleSelect({
  selectedMods,
  setSelectedMods,
  errors,
}) {
  const [modules, setModules] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //load modules from NUSMods API
  const loadModules = async () => {
    console.log("loading");
    const response = await fetch(
      `https://api.nusmods.com/v2/2021-2022/moduleList.json`
    );
    const json = await response.json();
    const modList = json.map((x) => ({
      label: `${x.moduleCode}: ${x.title}`,
      value: x.moduleCode
    }));
    setModules(modList);
  };

  //only load on component mount
  useEffect(loadModules, []);

  const filteredOptions = useMemo(() => {
    if (!inputValue) {
      return modules;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");

    for (const module of modules) {
      if (regByInclusion.test(module.label)) {
        if (regByStart.test(module.label)) {
          matchByStart.push(module);
        } else {
          matchByInclusion.push(module);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValue, modules]);

  const slicedOptions = useMemo(
    () => filteredOptions.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptions]
  );

  return (
    <>
      <div className="mb-3">
        Please select the relevant modules you have completed along with your
        grade for each module.
      </div>
      <Select
        onChange={setSelectedMods}
        isMulti
        filterOption={() => true} // disable native filter
        onInputChange={(value) => setInputValue(value)}
        options={slicedOptions}
        defaultValue={selectedMods}
        placeholder={"Select your preferred modules"}
        styles={{
          control: (provided, state) =>
            errors.modules
              ? {
                  ...provided,
                  borderColor: "red",
                }
              : provided,

          // Fixes the overlapping problem of the component
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
        isClearable={true}
      />
      <div>
        {errors.modules && (
          <div
            style={{
              marginTop: "3px",
              fontSize: "13px",
              color: "rgb(244, 67, 54)",
            }}
          >
            {errors.modules}
          </div>
        )}
      </div>
    </>
  );
}
