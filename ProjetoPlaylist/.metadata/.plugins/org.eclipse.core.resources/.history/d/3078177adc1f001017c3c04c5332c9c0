package com.projetoplaylist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoplaylist.entities.Music;
import com.projetoplaylist.service.MusicService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping(value = "/music")
public class MusicController {
	
	@Autowired
	MusicService musicService;

	
	@GetMapping
	public ResponseEntity<List<Music>> findAll() {
		List<Music> list = musicService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Music> findById(@PathVariable Long id) {
		Music music = musicService.findById(id);
		return ResponseEntity.ok().body(music);
	}
	
	
}
