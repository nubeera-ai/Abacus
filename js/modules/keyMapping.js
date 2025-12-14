// ---------- CUSTOM KEY MAPPING ----------
let keys = {
    k1new: "a",
    k1ans: "s",
    k2new: "l",
    k2ans: ";"
};

function saveKeyMappings() {
    keys = {
        k1new: document.getElementById("k1_new").value.trim().toLowerCase() || 'a',
        k1ans: document.getElementById("k1_ans").value.trim().toLowerCase() || 's',
        k2new: document.getElementById("k2_new").value.trim().toLowerCase() || 'l',
        k2ans: document.getElementById("k2_ans").value.trim().toLowerCase() || ';'
    };
    localStorage.keys = JSON.stringify(keys);
    showToast('Key mappings saved successfully!');
}

export { keys, saveKeyMappings, showToast };
