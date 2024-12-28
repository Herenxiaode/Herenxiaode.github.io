
echo "Europe/Rome" >/etc/timezone CEST

cmd /c pm2 restart server

networkingMode=bridged
vmSwitch=WSL
ipv6=true
dhcp=true

Start-Service -Name WinRM

C:\ProgramData\ssh\sshd_config

PasswordAuthentication yes
PermitEmptyPasswords yes

xcopy /ysi out\server.js \\Print-R4\C\PrintMaster\	#CMD拷贝文件

net share C=C: /grant:everyone,full					#CMD共享C盘
icacls "C:\Users\*" /grant everyone:(OI)(CI)F		#CMD开放权限

docker run --detach -v "TrueNAS:/data" -p 88:80 -p 99:443 ixsystems/truecommand					#docker truecommand

docker run -it --rm --name certbot -p 80:80 -p 443:443 -v "D:\AppData\letsencrypt\etc:/etc/letsencrypt" -v "D:\AppData\letsencrypt\lib:/var/lib/letsencrypt" certbot/certbot certonly

netsh advfirewall firewall add rule name=Node dir=in action=allow localport=88 protocol=tcp		#CMD开启TCP-88端口

wsl --list --verbose					#列出已安装的wsl
wsl --set-default docker-desktop		#切换wsl
wsl -u root								#指定用户登录

Get-NetAdapter							#列出网卡
Get-VMSwitch							#列出Hyper-V虚拟交换机
Set-VMSwitch WSL -NetAdapterName 1G		#Hyper-V直连网卡

mklink /j <new> <old>					#文件链接 

find ./a -depth -name "*TC*" -type f -print0|xargs --null -i cp "{}" ./b	#查找目标文件并拷贝

npm install pm2 pm2-windows-startup -g
pm2-startup install
pm2 start xxx
pm2 save