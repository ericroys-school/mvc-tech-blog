import { getElement} from "./util.js";

getElement("btn-add").addEventListener("click", async (e) => {
    document.location.replace("/dashboard/create");
});