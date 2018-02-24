#!/usr/bin/env sh
#==========================================
#@author:Evan zhanghui451@jk.cn
#@version:1.0
#==========================================
BASEDIR=`dirname $0`
PWD=`pwd`
echo `pwd`

TFS_KEY_IN_TEST=$1
TFS_TEST_SRV='http://static.test.pajkdc.com/v1/tfs'
TFS_PROD_SRV='http://tfspub.jk.cn'

DOWNLOAD_DIR=$BASEDIR/download
if [ ! -e $DOWNLOAD_DIR ]; then
echo '$DOWNLOAD_DIR is not found.'
mkdir $DOWNLOAD_DIR
fi

eval "wget --output-document=$DOWNLOAD_DIR/$TFS_KEY_IN_TEST $TFS_TEST_SRV/$TFS_KEY_IN_TEST"

eval "curl --data-raw '@$DOWNLOAD_DIR/$TFS_KEY_IN_TEST' -X POST $TFS_PROD_SRV"
