
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function setCookie(cookieName, cookievalue, expiredays) {
    const data = new Date();
    data.setTime(data.getTime() + (expiredays*24*60*60*1000));
    let expires = "expires="+ data.toUTCString();
    document.cookie = cookieName + "=" + cookievalue + ";" + expires + ";path=/";
}

export function deleteCookies() {
    var cookies = document.cookie.split(';');
    // set 1 Jan, 1970 expiry for every cookies
    for (var i = 0; i < cookies.length; i++)
    document.cookie = cookies[i] + "=;expires=" + new Date(0).toUTCString();
}