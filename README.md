JS-CondVar
==========

Conditional Variable for Javascript

Version
=======

0\.03

Synopsis
========

+ Basic usage

```javascript
// First, you should get a new CondVar object.
var my_cv = CondVar.get();

// Then, tell the CondVar that something asynchronous is happening by begin-end pair.
my_cv.begin();
async_job(..., function(result){
  ...
  my_cv.end(); // or my_cv();
});

// You can assign more asynchronous jobs...

// Then, you can optionaly assign a couple of callbacks
my_cv.cb(function(){ ... }).cb(function(){ ... });
my_cv.cb(function(){ ... }).cb(function(){ ... });

// These callbacks will be called when those asynchronous jobs are done.
```

+ Wrapped callback

```javascript
// You can use wrap on an asynchronous job like this:
async_job(..., my_cv.wrap(function(result){
  // the original callback
}));

// The wrap will begin my_cv immediately, and end it after the callback returns.
```

+ Chained CondVar

```javascript
// When you get a new CondVar object, you can optionally assign a parent CondVar to it.
var my_cv = CondVar.get(parent_cv);

// Then my_cv will be an asynchronous pending job of the parent_cv.
// It will implicitly begin the parent_cv, and end parent_cv when my_cv are all done.
```

Install
=======

If you use [GreenDefine][] or [RequireJS][] you can load it as a module.

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

    var TheCondVar = CondVar.noConflict();
    // The noConflict function will release window.CondVar to its original value,
    // and return the CondVar to you.
</script>
```

[RequireJS]: http://requirejs.org/
[GreenDefine]: https://github.com/CindyLinz/JS-GreenDefine

API Reference
=============

+ cv = CondVar.get([parent_cv])

  Get a new CondVar. If you give the **parent\_cv**,
  **get** will call **parent\_cv**'s **begin** immediately and then **end**
  when this **cv** is fired.

+ cv = cv.begin()

  Tell the **cv** that something is started.
  This will increase an internal waiting counter.

  You should never call **begin** on a fired **cv**.

  This function return the **cv** itself.

+ cv = cv.end()

  Tell the **cv** that something is done.
  This will decrease an internal waiting counter.
  When the internal waiting counter decreased to zero,
  the **cv** will fire all the callbacks and enter the fired state.

  You should never call **begin** on a fired **cv**.

  This function return the **cv** itself.

+ cv()

  The **cv** itself can be called. It's identical to cv.end().

+ cv = cv.cb(callback)

  Add a callback function to the **cv**.
  The **cv** maintains a **cb** list,
  When the **cv** fire, it will call each callback in sequence.

  If you call **cb** on a fired **cv**,
  it'll call this callback immediately.

  If you call **cb** on a new **cv**,
  it will change into fire state immediately.
  This is for the situation that something might happen or not.
  To prevent the callbacks starvation if it needs nothing to happen.
  So, remember to put your callbacks after the begin-end pairs.

  This function return the **cv** itself.

+ wrapped\_callback = cv.wrap(callback)

  This is a helper function. It forms a begin-end pair start immediately when
  you wrap it, and end when the **wrapped\_callback** is called.

  When the **wrapped\_callback** is called, it will call the original **callback** first,
  and then call the **end**.
  So you can put additional **begin** or **wrap** in the **callback** to further defer the fired state.

Lincense
========

Copyright 2012, Cindy Wang (CindyLinz)  
Licensed under the MIT or GPL Version 2 licenses or GPL Version 3 licenses.

Date: 2013.1.6
