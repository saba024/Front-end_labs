import socket
import threading
import queue
import sys
import random
import os
import time
from datetime import datetime
from queue import Queue


def Send(name, sock:socket, host, port2, messages, q):
	counter = 0
	while True:
		
		data = input('{}: '.format(name))
		if data == "qqq":
			break
		elif data == "":
			continue

		if q.empty() == False:
			counter = q.get()

		now = datetime.now()
		data = name + ': '+ data + '/' + str(counter) + '/' + str(now)
		sock.sendto(data.encode('utf-8'),(host, port2))
		mes = (counter, data, str(now))
		#print(counter)
		messages.append(mes)
		#print(messages)
		#print(mes)
		print_chat(messages)
		counter += 1

def Recieve(sock:socket, host, port, messages, q):
	templist = list()
	confirm = ''
	first = False
	second = False
	while True:
		try:
			data,addr = sock.recvfrom(1024)

			if data:
				#temp = data.decode('utf-8')
				message = data.decode('utf-8')
				#print(message)
				if message[0] == '|':
					print(message)
					print("Some messages were lost")
					templist = message.split('/')
					error = templist[1]
					length = len(messages)
					a = length - error
					while a < length:
						temp = messages[a]
						sock.sendto(temp[1].encode('utf-8'), (host, port))
						a += 1

				elif message[0] == '#':
					print("Your message was succesfully recieved")
				
				else:
					templist = message.split('/')
					temp = templist[1]
					#check_messages(messages, sock, host, port, int(temp))
					message_confirmation(messages, sock, host, port, int(temp))
					print(messages)
					now = str(templist[2])
					mess = (temp, message, now)
					messages.append(mess)
					print_chat(messages)
					counter = int(templist[1]) + 1
					if q.empty() == False:
						q.get()
					q.put(counter)
			else:
				print("The connection was lost")
		except:
			pass

def print_chat(messages):
	clear = lambda: os.system('clear')
	clear()
	messages.sort(key=lambda tup: tup[2])
	for a in messages:
		temp_content = a[1].split('/')
		print(temp_content[0])

def message_confirmation(messages, sock, host, port, count):
	first = False
	second = False
	
	if not messages:
		if count == 0:
			first = True
	
	else:
		temp = messages[-1]
		confirm = int(temp[0])
		if count - confirm == 1:
			second = True

	if first or second:
		data = '#' + "Your message was successfully delivered" + '/' + str(count)
		sock.sendto(data.encode('utf-8'), (host, port))

	else:
		print("Your message was lost")
		data = '|' + "Your message was lost" + '/' + str(count - confirm)
		sock.sendto(data.encode('utf-8'), (host, port))


if __name__ == '__main__':
	messages = []
	counter = 0
	queue = Queue()
	if len(sys.argv) == 4:
		#client = Client(sys.argv[1], sys.argv[2], sys.argv[3])
		#client.start()
		host = sys.argv[1]
		port = int(sys.argv[2])
		port2 = int(sys.argv[3])
		print("Trying to connect to {}:{}...".format(host, port))
		sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
		sock.bind((host, port))
		print('Successfully connected to {}:{}....'.format(host, port))
		print()
		name = input('Your name: ')
		print()
		print("Ready to recieve messages")
		Send = threading.Thread(target=Send, args=(name, sock, host, port2, messages, queue, ))
		Recieve = threading.Thread(target=Recieve, args=(sock, host, port2, messages, queue, ))
		Send.start()
		Recieve.start()

