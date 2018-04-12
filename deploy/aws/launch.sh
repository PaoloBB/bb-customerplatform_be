#!/bin/bash

INSTALL_LOG="/tmp/bb-customerplatform_be-install.log"

echo "bb-customerplatform_be - Install at $(date +'%Y-%m-%d %H:%M')" > $INSTALL_LOG

cd /opt/brandbastion/bb-customerplatform_be
# config
echo "[INFO] Checking config..." >> $INSTALL_LOG
if [ ! -f "deploy/conf/vars.global" ]; then
		mv "deploy/conf/vars-example.global" "deploy/conf/vars.global" >> $INSTALL_LOG
		echo "[INFO] Using config from template, please set config values!" >> $INSTALL_LOG
else
		rm -rf "deploy/conf/vars-example.global" >> $INSTALL_LOG
		echo "[INFO] Using existing config." >> $INSTALL_LOG
fi

#kill existing process
ps aux | grep "node index.js" | awk '{print $2}' | xargs sudo kill 2> /dev/null || true

# export bash variable
source deploy/conf/vars.global
export $(cut -d= -f1 deploy/conf/vars.global)

/root/.nvm/versions/node/v7.0.0/bin/node index.js 1>/tmp/bb-customerplatform_be.log 2>/tmp/bb-customerplatform_be.log &

echo "Completed at $(date +'%Y-%m-%d %H:%M')" >> $INSTALL_LOG
