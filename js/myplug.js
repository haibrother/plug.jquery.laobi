//
jQuery.test = function(param){
    alert('The first plug test--'+param);
};

jQuery.extend({
    foo:function(){
        alert('test foo');
    },
    bar:function(){
        alert('test bar');
    }
});

jQuery.myplugin = ({
    foo:function(){
        $.bar();
    },
    bar:function(){
        alert('test bar');
    }
});

//$.test('aaa');
//$.foo();
$.myplugin.foo();