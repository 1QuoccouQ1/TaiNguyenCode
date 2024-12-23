document.getElementById("next").onclick = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slide").appendChild(lists[0]);
}
document.getElementById("prev").onclick = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slide").prepend(lists[lists.length-1]);
}