let menu = document.QeurySelector('#menu-icon');
let navlist = document.QeurySelector('.navlist');

menu.onclick = () => {
  menu.ClassList.toggle ('bx-x');
  navlist.ClassList.toggle('open');
}
