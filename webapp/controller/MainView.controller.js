sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";


    return Controller.extend("ui.demoapp.demoapp.controller.MainView", {
        onInit: function () {

        },
        onUpload: function(oEvent)
        {
            
            var that = this;
            var files = oEvent.getParameter("files");
            if(files.length > 0)
            {

                var reader = new FileReader();

                reader.onload = function(e)
                {
                    var data = e.target.result;
                    var workbook = XLSX.read(data,{ 
                        type:"binary"
                    });

                        var tableData = [];

                        workbook.SheetNames.forEach(sheetName =>{
                           var  xl_row_data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            tableData = [...tableData, ...xl_row_data];
                         });

                        var jModel = new sap.ui.model.json.JSONModel({result:tableData});
                        that.getview().setModel(jModel, "userdetailsli")
                 }
                    reader.oneerror = function(ex){
                        console.log(ex);
                    }

                    reader.readAsBinaryString(files[0]);
            }
     },


        onEditMode: function(){
            this.byId("editModeButton").setVisible(false);
            this.byId("saveButton").setVisible(true);
            this.byId("deleteButton").setVisible(true);
            this.rebindTable(this.oEditableTemplate, "Edit");
       }
    });
});
