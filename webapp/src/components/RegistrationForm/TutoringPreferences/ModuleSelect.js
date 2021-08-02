import Select from "react-select";
import { useState, useEffect, useMemo } from "react";
import escapeRegExp from "lodash/escapeRegExp";
import Loading from "../../Loading/Loading";

const MAX_DISPLAYED_OPTIONS = 500;

export default function ModuleSelect({
  formState,
  setFormState,
  errors,
  touched,
  isSingle, //requestTutor
  setModule, //requestTutor
}) {
  const [allModules, setAllModules] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMods, setSelectedMods] = useState(
    formState && formState.modules
  );
  const [loading, setLoading] = useState(false);

  //update formState when selectedMods changes
  useEffect(() => {
    setModule
      ? setModule(selectedMods)
      : setFormState({ ...formState, modules: selectedMods });
  }, [selectedMods]);

  const showErrors =
    touched === undefined ? errors.modules : touched && errors.modules;

  //only load on component mount
  useEffect(() => {
    //load modules from NUSMods API
    const loadModules = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.nusmods.com/v2/2021-2022/moduleList.json`
      );
      const json = await response.json();
      const modList = json.map((x) => ({
        label: `${x.moduleCode}: ${x.title}`,
        value: x.moduleCode,
      }));
      setAllModules(modList);
      setLoading(false);
    };

    loadModules();
  }, []);

  //filter modlist based on input
  const filteredOptions = useMemo(() => {
    if (!inputValue) {
      return allModules;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
    const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");

    for (const module of allModules) {
      if (regByInclusion.test(module.label)) {
        if (regByStart.test(module.label)) {
          matchByStart.push(module);
        } else {
          matchByInclusion.push(module);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValue, allModules]);

  //limit results to MAX_DISPLAYED_OPTIONS
  const slicedOptions = useMemo(
    () => filteredOptions.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredOptions]
  );

  return (
    <>
      <Loading loading={loading} />
      <Select
        onChange={setSelectedMods}
        isMulti={!isSingle}
        filterOption={() => true} // disable native filter
        onInputChange={(value) => setInputValue(value)}
        options={slicedOptions}
        defaultValue={selectedMods}
        placeholder={!isSingle && "Select your preferred modules"}
        styles={{
          //red border around field when error detected
          control: (provided, state) =>
            showErrors
              ? {
                  ...provided,
                  borderColor: "red",
                }
              : provided,

          // Fixes the overlapping problem of the dropdown
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
        isClearable={true}
      />
      {/* error message */}
      <div>
        {showErrors && (
          <div
            style={{
              marginTop: "3px",
              fontSize: "13px",
              color: "rgb(244, 67, 54)",
            }}
          >
            {showErrors}
          </div>
        )}
      </div>
    </>
  );
}
