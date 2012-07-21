JS-CondVar
==========

Conditional Variable for Javascript

Version
=======

Not Released Yet!  
Everything is subject to change.

Synopsis
========

```javascript
// First, you should get a new CondVar object.
var my_cv = CondVar.get();

// Then, you can optionaly assign a couple of callbacks
my_cv.cb(function(){ ... }).cb(function(){ ... });
my_cv.cb(function(){ ... }).cb(function(){ ... });
```

Install
=======

If you use [RequireJS][] you can load it as a module.

```javascript
define([..., 'CondVar', ...], function(..., CondVar, ...){
    var my_cv = CondVar.get();
    ...
});
```

If you use this library stand alone.

```html
<script type="text/javascript" src="CondVar.js"></script>
<script type="text/javascript">
    var my_cv = CondVar.get();
    ...
</script>
```

[RequireJS]: http://requirejs.org/

Lincense
========
