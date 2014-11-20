#!/bin/bash

curl -X GET -H "Authorization: Bearer $SPARK_TOKEN" https://api.spark.io/v1/devices/$SPARK_DEVICE_ID