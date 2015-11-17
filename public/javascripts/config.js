requirejs.config({
    "baseUrl": "/javascripts/",
    "paths": {
      "app": "app",
      "react":"react",
      "reactdom":"reactdom",
      "jquery":"jquery"
    },
    "waitSeconds": 0
});
requirejs(["app/main"]);

