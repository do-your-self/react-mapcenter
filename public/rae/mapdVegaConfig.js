let exampleVega = {
		"width": '',
			  "height":'',
			  "data": [
			    {
			      "name": "stellitedb",
			      "sql": "SELECT lon as x,lat as y,mmsi as rowid FROM stellitedb  LIMIT 50000"
			    }
			  ],
			  "scales": [
			    {
			      "name": "x",
			      "type": "linear",
			      "domain": [
			    	  '',
			    	  ''
			      ],
			      "range": "width"
			    },
			    {
			      "name": "y",
			      "type": "linear",
			      "domain": [
			    	  '',
			    	  ''
			      ],
			      "range": "height"
			    }
			  ],
			  "marks": [
			    {
			      "type": "points",
			      "from": {
			        "data": "stellitedb"
			      },
			      "properties": {
			        "x": {
			          "scale": "x",
			          "field": "x"
			        },
			        "y": {
			          "scale": "y",
			          "field": "y"
			        },
			        "fillColor": "purple",
			        "size": {
			          "value": 3
			        }
			      }
			    }
			  ]
			};